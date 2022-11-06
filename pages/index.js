import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          LAB 2
        </h1>


        <div className={styles.grid}>
          <a href="/xss" className={styles.card}>
            <h2>XSS napad</h2>
          </a>

          <a href="/csrf" className={styles.card}>
            <h2>CSRF napad</h2>
          </a>

        </div>
      </main>

    </div>
  )
}
