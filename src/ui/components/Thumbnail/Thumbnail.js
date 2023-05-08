import {useEffect} from 'react';
import placeholder from '../../../../public/static/images/placeholder.svg';

const Thumbnail = ({ src = undefined, alt = 'Alt', width = 30, height = 30, id = undefined }) => {
	
	const _src = !!id ? `${process.env.API_SERVER}${src}` : placeholder.src;
	
	// const srcToFile = async () => {
	// 	return await fetch(_src)
	// 		.then(function (res) {
	// 			return res.arrayBuffer();
	// 		})
	// 		.then(function (buf) {
	// 			return new File([buf], id);
	// 		})
	// 		.catch(err => console.log('Error ', err))
	// }
	
	// useEffect(() => {
	// 	// srcToFile()
	// 	// 	.then(function (file) {
	// 	// 		const body = new FormData();
	// 	// 		body.append('file', file);
	// 	// 		fetch(`${process.env.API_SERVER}/api/files/upload`, {
	// 	// 			method: 'POST',
	// 	// 			body
	// 	// 		})
	// 	// 			.then(res => console.log('res ', res))
	// 	// 	})
	// 	getBase64(_src, (res) => {
	// 		console.log(res)
	// 	})
	// }, [id, _src])
	
	// const getBase64 = (fileUrl, callback) => {
	// 	const image = new Image();
	// 	image.crossOrigin = 'anonymous';
	// 	image.onload = () => {
	// 		const canvas = document.createElement('canvas');
	// 		const ctx = canvas.getContext('2d');
	// 		canvas.height = image.naturalHeight;
	// 		canvas.width = image.naturalWidth;
	// 		ctx.drawImage(image, 0, 0);
	// 		const dataURl = canvas.toDataURL();
	// 		callback && callback(dataURl);
	// 	}
	// 	image.src = fileUrl;
	// }
	
	return (
		<img
			src={_src}
			width={width}
			height={height}
			alt={alt}
			id={id}
		/>
	)
}

export default Thumbnail