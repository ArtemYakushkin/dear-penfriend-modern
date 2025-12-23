import { useResponsive } from '../hooks/useResponsive';
import Avatar from './Avatar';
import {
	Grid,
	GridHeader,
	GridNickname,
	GridDate,
	GridContent,
	GridImage,
	GridBoxText,
	GridTitle,
	GridText,
	GridBottom,
	GridLine,
	GridFooter,
	GridIconBox,
	GridIcon,
} from '../style/GridStyles';

import { FaRegHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';

const PopularCard = ({ post, author, onClick }) => {
	const { isMobile, isTablet } = useResponsive();
	const media = post.media?.[0];

	return (
		<Grid
			style={{
				boxShadow: 'none',
				backgroundColor: 'var(--bg-auth-form)',
			}}
			onClick={onClick}
		>
			<GridHeader>
				<Avatar
					photo={author?.avatar}
					name={author?.nickname}
					style={{
						width: isMobile ? '40px' : isTablet ? '40px' : '63px',
						height: isMobile ? '40px' : isTablet ? '40px' : '63px',
						marginRight: isMobile
							? '6px'
							: isTablet
							? '6px'
							: '15px',
					}}
				/>
				<div className="grid-info-post">
					<GridNickname>
						{author?.nickname || 'Unknown Author'}
					</GridNickname>
					<GridDate>
						{new Date(post.createdAt).toLocaleDateString()}
					</GridDate>
				</div>
			</GridHeader>

			<GridContent>
				<GridImage>
					{media &&
						(media.includes('.mp4') ? (
							<video autoPlay loop muted>
								<source src={media} type="video/mp4" />
							</video>
						) : (
							<img src={media} alt="Post" />
						))}
				</GridImage>

				<GridBoxText>
					<GridTitle>{post.title}</GridTitle>
					<GridText>{post.text}</GridText>
				</GridBoxText>
			</GridContent>

			<GridBottom>
				<GridLine>
					<div></div>
				</GridLine>

				<GridFooter>
					<GridIconBox>
						<GridIcon>
							<FaRegHeart
								size={24}
								color="var(--color-black-change)"
							/>
							<span>{post.likes.length}</span>
						</GridIcon>
						<GridIcon>
							<FiEye
								size={24}
								color="var(--color-black-change)"
							/>
							<span>{post.views}</span>
						</GridIcon>
						<GridIcon>
							<BiComment
								size={24}
								color="var(--color-black-change)"
							/>
							<span>{post.comments?.length || 0}</span>
						</GridIcon>
					</GridIconBox>
				</GridFooter>
			</GridBottom>
		</Grid>
	);
};

export default PopularCard;
