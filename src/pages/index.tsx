import type { GetServerSideProps, NextPage } from 'next'
import { GetCharactersQuery } from '../graphql/generated/graphql'
import { getServerPageGetCharacters, ssrGetCharacters } from '../graphql/generated/page'
import { withApollo } from '../lib/withApollo'

type HomeProps = {
  data: GetCharactersQuery
}

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return getServerPageGetCharacters({}, ctx)
}

export default withApollo(ssrGetCharacters.withPage()(Home))
