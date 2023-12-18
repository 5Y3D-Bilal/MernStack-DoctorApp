const uploadtoCloudinary = async file => {
    const uploadData = new FormData()

    uploadData.append('file', file)
    uploadData.append('upload_preset', 'TestCloud')
    uploadData.append('cloud_name', 'bilal567-cloud')

    const res = await fetch(`https://api.cloudinary.com/v1_1/bilal567-cloud/image/upload/`, {
        method: 'POST',
        body: uploadData
    })

    const data = await res.json()

    return data
}

export default uploadtoCloudinary