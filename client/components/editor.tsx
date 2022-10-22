import React from 'react'
import { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Marker from '@editorjs/marker'
import Embed from '@editorjs/embed'
import Image from '@editorjs/image'
import Table from '@editorjs/table'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import Checklist from '@editorjs/checklist'
import LinkTool from '@editorjs/link'
import Raw from '@editorjs/raw'
import Paragraph from '@editorjs/paragraph'
import Codebox from '@bomdi/codebox'
import gql from 'graphql-tag'
import apolloClient from '../lib/apolloClient'

const Editor: React.FC = () => {
  const editorRef = useRef(null)
  const [editorData, setEditorData] = useState(null)
  const initEditor = () => {}
  const handleSave = async () => {}

  useEffect(() => {
    if (!editorRef.current) {
      initEditor()
    }
  }, [])

  return (
    <div>
      <div id="editorjs" />
      <div className="flex justify-center -mt-30 mb-20">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center px-12 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </div>
  )
}

/**
 * dynamic import時にdefaultが付与されている必用がある\
 * (`LoaderComponent`型が`Promise<React.ComponentType<P> | { default: React.ComponentType<P> }`)
 */
export default Editor
