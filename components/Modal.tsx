// import { createPortal } from "react-dom";
// import { ReactNode, useRef, useState } from "react";
// import styles from '../src/styles/Modal.module.css'
// // interface PortalProps {
// //   children?: ReactNode;
// // }
// const OPTIONS = ['Profile','Sign out']

// export default function Portal() {
//   const [isVisible, setIsVisible] = useState<boolean>(true);
//   const modalRef = useRef<HTMLDivElement>(null)
//   function handleClick(e:React.SyntheticEvent){
//     e.stopPropagation();
//     if(e.target === modalRef.current){
//       setIsVisible(false)
//     }
//   }
//   return (
//     createPortal((
//     <div className={styles['portal-container']} ref={modalRef}>
//       <ul className={styles['options-container']}>
//         <li className={styles.option}>Profile</li>
//         <li className={styles.option}>Sign out</li>
//       </ul>
//     </div>), document.getElementById('portal')!)
//   )
// }
