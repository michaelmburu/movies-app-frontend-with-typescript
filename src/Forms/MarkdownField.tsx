import React from 'react'
import {Field, useFormikContext} from 'formik'
import ReactMarkdown from 'react-markdown'
import './MarkdownField.css'
const MarkdownField = (props: MarkDownFieldProps) => {

    const {values} = useFormikContext<any>()
  return (
    <div className='mb-3 form-markdown'>
        <div>
            <label>{props.displayName}: (Use Markdown Language)</label>
            <div>
                <Field name={props.field} as="textarea" className="form-textarea" />
            </div>
        </div>
        <div>
            <label>{props.displayName} (preview):</label>
            <div className='markdown-container'>
                <ReactMarkdown>{values[props.field]}</ReactMarkdown>
            </div>
        </div>
    </div>
  )
}

interface MarkDownFieldProps {
    displayName: string
    field: string
}

export default MarkdownField