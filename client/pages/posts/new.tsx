import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('../../components/editor'), {
  ssr: false
})

const CreatePost: React.FC = () => (
  <>
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Create a new post</h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="border-4 border-dashed border-gray-200 rounded-lg pt-10">
              <Editor />
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  </>
)

export default CreatePost
