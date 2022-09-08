import React, { ChangeEvent, useState } from 'react'
import {useFormikContext} from 'formik'

 const ImageField = (props: ImageFieldProps) => {

    //Set Image 
    const  [imageBase64, setImageBase64] = useState('')

    //Set Image URL
    const [imageUrl, setImageUrl] = useState(props.imageUrl)

    // Send image value
    const {values} = useFormikContext<any>()

    const divStyle = {marginTop: '10px'}
    const imageStyle = {width: '450px'}

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.files) {
            const file = e.currentTarget.files[0]
            if(file) {
                // Take a file and convert to base64
                toBase64(file)
                .then((base64Representation: string) => {
                    setImageBase64(base64Representation)
                })
                .catch(error => console.error(error))
                //Send fiel to parent component
                values[props.field] = file
                // Set ImageUrl empty
                setImageUrl('')
            } else {
                setImageBase64('')
            }
        }
    }
    
    // Take file & return base64 as promise
    const toBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = (error) => reject(error)
        })
    }

  return (
    <div className='mb-3'>
        <label>{props.displayName}</label>
        <div>
            <input type='file' accept='.jpg,.jpeg,.png' onChange={handleOnChange} />
        </div>
        {imageBase64 
            ? <div>
                <div style={divStyle}>
                    <img style={imageStyle} src={imageBase64} alt="selected" />
                </div>
             </div> 
            : null
        }

        {imageUrl 
            ? <div>
                <div style={divStyle}>
                    <img style={imageStyle} src={imageUrl} alt="selected" />
                </div>
             </div> 
            : null
        }
    </div>
  )
}

interface ImageFieldProps {
    displayName: string
    imageUrl: string
    field: string
}

ImageField.defaultProps = {
    imageUrl: '' 
}

export default ImageField
