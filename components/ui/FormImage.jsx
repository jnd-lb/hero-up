import React, { useRef } from 'react'

function FormImage({image=null, readOnly=false}) {
    const imageInputRef = useRef(null);
    const profilePictureRef = useRef(null);
    const handleImageClick = () => {
        imageInputRef?.current.click();
      };    

    
    const changeImage = (event) => {
    let image = imageInputRef?.current.files[0];
    if (image) {
        profilePictureRef.current.src = URL.createObjectURL(image);
    }
    };
    

  return (


    <div className="flex justify-center items-center w-full aspect-square bg-gray-100 rounded-xl overflow-hidden" onClick={()=>readOnly?()=>{}:handleImageClick()}>
      <div className="relative h-full w-full">
        <div className={`${readOnly?'hidden':'flex'} cursor-pointer text-white absolute z-20 top-0 left-0 items-center justify-center w-full h-full hover:bg-amber-500 hover:bg-opacity-60 hover:backdrop-blur-sm  transition-all`}>
          <i className="bi bi-pencil bg-amber-500 bg-opacity-90 w-16 aspect-square rounded-full flex items-center justify-center shadow-xl"></i>
        </div>
        <img
          ref={profilePictureRef}
          src={image}
          className={" w-full h-full object-cover"}
        />
      </div>
      <input
        className="hidden"
        accept="image/x-png,image/gif,image/jpeg"
        ref={imageInputRef}
        type="file"
        onChange={changeImage}
        name="file"
        id=""
      />

    </div>

  )
}

export default FormImage