import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { GetServerSideProps } from 'next'
import Link from 'next/link'
import apolloClient from '../../lib/apolloClient'
import dynamic from 'next/dynamic'

type Block = {
  id: string
  //TODO: dataの型はtypeに依存するのでEditorJS用の型定義を作る必用あり
  data: unknown
  type: string
}
type Content = {
  time: number
  blocks: Array<Block>
  verison: string
}
type EditorData = {
  data: Content
}
type PostProps = {
  post: {
    content: string
    published: string
    slug: string
  }
}

const Output = dynamic<EditorData>(() => import('editorjs-react-renderer'), {
  ssr: false
})

const Post: React.FC<PostProps> = props => {
  const content = JSON.parse(props.post.content) as Content
  return (
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/">
              <a className="text-3xl font-bold text-white">Home</a>
            </Link>
          </div>
        </header>
      </div>
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="border-4 border-dashed border-gray-200 rounded-lg py-10 px-32">
              <Output data={content} />
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  type QueryResult = {
    findPostBySlug: PostProps
  }
  const { slug } = context.query
  const { data } = await apolloClient.query<QueryResult>({
    query: gql`
      query Post($slug: String!) {
        findPostBySlug(slug: $slug) {
          content
          published
          slug
        }
      }
    `,
    variables: {
      slug
    }
  })
  return {
    props: {
      post: data.findPostBySlug
    }
  }
}
export default Post
