import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.logo}>
        <span>MOVIE</span>
        <span>NOTE</span>
      </div>
      <div className={styles.info}>
        <span>Tel. 010-1234-5678</span>
        <span>고객센터</span>
        <span>제휴문의</span>
        <span></span>
      </div>
    </footer>
  )
}

export default Footer
