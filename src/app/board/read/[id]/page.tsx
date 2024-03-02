import { GetServerSidePropsContext } from 'next'
import React from 'react'

const  DetailPage= async (context: GetServerSidePropsContext) => {
  const { params } = context;
  const movieReviewId = params!!.id;
  console.log("param",context);
  

  return (
    <div>djkdkfkjafjkajk</div>
  )
}

export default DetailPage