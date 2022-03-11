

export const fileUpload = async ( file )  => {
    // console.log(file)

    // const cloudUrl = 'https://api.cloudinary.com/v1_1/wmss/image/upload?upload_preset=fztspe2b';
    const cloudUrl = 'https://api.cloudinary.com/v1_1/wmss/image/upload';
    const formData = new FormData();
    formData.append( 'upload_preset', 'react-journal_1830' )
    formData.append('file', file);

    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        } )

        if ( resp.ok ){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }
   
    } catch (err) {
        // console.log(error)
        throw err;
    }
}