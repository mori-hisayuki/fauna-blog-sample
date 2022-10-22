import gql from 'graphql-tag'
import React from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import apolloClient from '../lib/apolloClient'

type Post = {
  content: string
  published: string
  slug: string
}
type HomeProps = {
  posts: Array<Post>
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  let allPosts = []

  props.posts.map(post => {
    const content = JSON.parse(post.content)
    const published = post.published
    const slug = post.slug
    let title = 'Without Title'
    let description = 'Without Description'
    for (let i = 0; i < content.blocks.length; i++) {
      if (content.blocks[i].type === 'header' && content.blocks[i].data.level === 2) {
        title = content.blocks[i].data.text
        break
      }
    }
    for (let i = 0; i < content.blocks.length; i++) {
      if (content.blocks[i].type === 'paragraph') {
        description = content.blocks[i].data.text
        break
      }
    }

    allPosts.push({
      title,
      description,
      published,
      slug
    })
  })

  return (
    <div className="bg-white pt-12 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Don&apos;t miss these awesome posts with some of the best tricks and hacks
            you&apos;ll find on the Internet!
          </p>
        </div>
        <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {allPosts.map(post => (
            <div key={post.title} className="border border-blue-100 py-8 px-6 rounded-md">
              <div>
                <Link href={`/posts/${post.slug}`}>
                  <a className="inline-block">
                    <span className="text-blue-100 bg-blue-800 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium">
                      Article
                    </span>
                  </a>
                </Link>
              </div>
              <Link href={`/posts/${post.slug}`}>
                <a className="block mt-4">
                  <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                  <p className="mt-3 text-base text-gray-500">{post.description}</p>
                </a>
              </Link>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <Link href={`/posts/${post.slug}`}>
                    <a>
                      <span className="sr-only">Paul York</span>
                    </a>
                  </Link>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    <span>Paul York</span>
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime="Nov 10, 2021">Nov 10, 2021</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>3 mins read</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  type QueryResult = {
    allPosts: {
      data: Post
    }
  }
  const POSTS_QUERY = gql`
    query {
      allPosts {
        data {
          content
          published
          slug
        }
      }
    }
  `
  const { data } = await apolloClient.query<QueryResult>({
    query: POSTS_QUERY
  })
  return {
    props: {
      posts: data.allPosts.data
    }
  }
}

export default Home
