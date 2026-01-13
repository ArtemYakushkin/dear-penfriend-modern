import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export const uploadMediaFiles = async (files = []) => {
	const urls = [];

	for (const file of files) {
		const fileRef = ref(storage, `posts/${uuidv4()}-${file.name}`);
		await uploadBytes(fileRef, file);
		urls.push(await getDownloadURL(fileRef));
	}

	return urls;
};

export const deleteMediaByUrl = async (url) => {
	const fileRef = ref(storage, url);
	await deleteObject(fileRef);
};
