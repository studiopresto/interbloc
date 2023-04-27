import {createContext, useCallback, useRef, useState, Fragment} from 'react';

export const ModalContext = createContext(null);

export const withModal = (WrappedComponent) => {
	const withModal = (props) => {
		
		const modalsRef = useRef([]);
		const [modals, setModals] = useState([]);
		
		const addModal = useCallback((modal) => {
			modalsRef.current.push(modal);
			setModals([...modalsRef.current]);
		}, [modalsRef, setModals]);
		
		const closeModal = useCallback(() => {
			modalsRef.current = modalsRef.current.slice(0, -1);
			setModals([...modalsRef.current]);
		}, [modalsRef, setModals]);
		
		return (
			<ModalContext.Provider value={[addModal, closeModal]}>
				<WrappedComponent {...props}/>
				{modals.map((modal, index) => (
					<Fragment key={index}>
						{modal}
					</Fragment>
				))}
			</ModalContext.Provider>
		)
	}
	
	return withModal;
}