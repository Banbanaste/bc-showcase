// react
import { useState } from 'react'
// next
import Head from 'next/head'
// components
import C from "../components"
// styles
import styles from "../styles/Showcase.module.css"

function Showcase({ data }) {
  // state to track page
  const [page, setPage] = useState(1)
  // render entries of current page
  // render page controller
  return (
    <>
      <Head>
        <title>Showcase</title>
        <meta name="description" content="BigCommerce Site Showcase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Showcase</h1>
        <section className={styles.section}>
          {data[page - 1].map(entry => entry && <C.EntryCard key={entry.id} {...entry} />)}
        </section>
        {data.length > 1 && <C.PageControls current={page} handlePageClick={setPage} pages={data.length} />}
      </main>
    </>
  )
}

// next ssg function
export async function getStaticProps() {
  // fetch list of entry ids
  const res = await fetch(`https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds`)
  const entries = await res.json()

  // fetch data per id from getShowcaseEntryById route
  // paginate results 2D array data structure
  const paginated = [] // init 2D array
  const errors = [] // array to retry errors (future enhancement)
  const limit = 10 // max number of items per page (inner array max length)
  let entryData = [] // temp array to hold up to X entry data points
  let count = 0 // count of pushes to temp array (items on a page)

  // while entry IDs in entries
  // remove entry ID from 0 index
  // fetch data and add to temp array (page)
  // when limit reached add temp array (page) to 2D array (paginated) 
  while (entries.length > 0) {
    if (count == limit && entryData.length > 0){
      paginated.push(entryData)
      entryData = []
      count = 0
    }

    const entry = entries.shift()

    try {
      const res = await fetch(`https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryById?id=${entry}`)
      const data = await res.json()
      if (Object.keys(data).length > 1) {
        entryData.push(data)
        count ++
      } else {
        errors.push(entry)
      }
    } catch (err) {
      console.log(err)
      errors.push(entry)
    }
  }

  // clean up rest of entries in temp array
  // case where final page does not reach entry limit
  if (entryData.length > 0){
    paginated.push(entryData)
    entryData = []
  }

  // return ssg data
  return { props: { data: paginated } }
}

export default Showcase
