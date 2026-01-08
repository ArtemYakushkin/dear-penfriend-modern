import { useState, useEffect } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import styled from 'styled-components';

import { useResponsive } from '../../hooks/useResponsive';

import ButtonCloseModal from '../Buttons/ButtonCloseModal';
import { ModalOverlay, Modal } from '../../style/ModalStyles';

import { FiSearch } from 'react-icons/fi';

const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);

const Search = styled.div`
	position: relative;
	width: 100%;
	height: 52px;
	margin-bottom: 20px;
`;

const Input = styled.input`
	width: 100%;
	height: 100%;
	border: 1px solid var(--bg-inactive-grey);
	border-radius: 30px;
	background-color: transparent;
	padding: 0px 64px 0px 25px;
	font-weight: 400;
	font-size: 16px;
	line-height: 22.4px;
	color: var(--color-black-change);

	&::placeholder {
		font-weight: 400;
		font-size: 16px;
		line-height: 22.4px;
		color: var(--color-grey-light);
	}
`;

const Content = styled.div`
	width: 100%;
	max-height: 382px;
	overflow-y: auto;
	padding-right: 3px;

	@media (max-width: 767px) {
		width: 100%;
		max-height: 382px;
		overflow-y: auto;
		padding-right: 3px;
	}
`;

const Result = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px;
`;

const BtnMore = styled.button`
	width: fit-content;
	font-size: 20px;
	font-weight: 600;
	line-height: 24px;
	border-radius: 30px;
	padding: 14px 36px;
	color: var(--color-accent);
	border: 1px solid var(--color-accent);
	margin: 20px 0;
`;

const ModalGifSearch = ({ isOpen, onClose, onGifSelect }) => {
	const [gifSearchTerm, setGifSearchTerm] = useState('');
	const [gifs, setGifs] = useState([]);
	const [offset, setOffset] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const { isMobile } = useResponsive();
	const LIMIT = 9;

	const searchGifs = async (isLoadMore = false) => {
		if (!gifSearchTerm.trim()) return;

		setIsLoading(true);
		const { data } = await gf.search(gifSearchTerm, { offset, limit: LIMIT });

		setGifs((prev) => (isLoadMore ? [...prev, ...data] : data));
		setOffset((prev) => prev + LIMIT);
		setIsLoading(false);
	};

	const handleSelectGif = (gif) => {
		onGifSelect(gif.images.original.url);
		onClose();
	};

	useEffect(() => {
		setOffset(0);
		setGifs([]);
	}, [gifSearchTerm]);

	if (!isOpen) return null;

	return (
		<ModalOverlay>
			<Modal style={{ width: isMobile ? '355px' : '400px', maxHeight: '500px' }}>
				<ButtonCloseModal onClose={onClose} />

				<Search>
					<label>
						<Input
							type="text"
							placeholder="Search GIFs..."
							value={gifSearchTerm}
							onChange={(e) => setGifSearchTerm(e.target.value)}
						/>
						<FiSearch
							style={{
								position: 'absolute',
								top: '50%',
								right: '25px',
								color: 'var(--color-accent)',
								transform: 'translateY(-50%)',
								cursor: 'pointer',
							}}
							size={24}
							onClick={() => {
								setOffset(0);
								searchGifs(false);
							}}
							disabled={isLoading || !gifSearchTerm.trim()}
						/>
					</label>
				</Search>

				<Content>
					<Result>
						{gifs.map((gif) => (
							<div key={gif.id} onClick={() => handleSelectGif(gif)} style={{ cursor: 'pointer' }}>
								<Gif gif={gif} width={isMobile ? '80' : '100'} noLink />
							</div>
						))}
					</Result>
					{gifs.length > 0 && (
						<BtnMore onClick={() => searchGifs(true)} disabled={isLoading}>
							Load more
						</BtnMore>
					)}
				</Content>
			</Modal>
		</ModalOverlay>
	);
};

export default ModalGifSearch;
