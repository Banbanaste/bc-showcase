// styles
import styles from "./PageControls.module.css"

const PageControls = ({ current, handlePageClick, pages }) => {
    // no side effect handleing
    // create list of elements represent page buttons 
    const pageArray = []
    for (let page = 1; page <= pages; page++) {
        pageArray.push(
            <a key={page} className={current === page ? styles.selected : styles.page} onClick={() => handlePageClick(page)}>
                {page}
            </a>
        )
    }

    // conditionally render Previous btn 
    // render page button links from above
    // conditionally render Next btn 
    return (
        <div className={styles.container}>
            {current > 1 && (
                <a className={styles.page} onClick={() => handlePageClick(current - 1)}>Previous</a>
            )}
            {
                pageArray
            }
            {current < pages && (
                <a className={styles.page} onClick={() => handlePageClick(current + 1)}>Next</a>
            )}
        </div>
    )
}

export default PageControls