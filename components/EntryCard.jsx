// next
import Image from 'next/image'
// styles
import styles from "./EntryCard.module.css"

// if an error makes it in does not break app
// remove (etc.) from titles
// render link and image as link
const EntryCard = ({ error=0, image, title, url }) => (
    error ? <></> :
    <div className={styles.container}>
        <div className={styles.titleSection}>
            <h3 className={styles.title}>{title.toString().split("(")[0]}</h3>
            <a className={styles.link} title={title} href={url.value} target="_blank" rel="noreferrer">View site</a>
        </div>
        <div className={styles.image}>
            <a title={title} href={url.value} target="_blank" rel="noreferrer">
                <Image src={image.url} alt={`Image of ${image.title} BigCommerce Site`} width={image.width} height={image.height} layout="responsive" />
            </a>
        </div>
    </div>
)

export default EntryCard