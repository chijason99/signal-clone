import styles from '../src/styles/LeftSideModal.module.css'

interface LeftSideModalProps{
    children: React.ReactNode;
}

export default function LeftSideModal({children}:LeftSideModalProps) {
  return (
    <div className={styles["left-side-modal-wrapper"]}>
        {children}
    </div>
  )
}
