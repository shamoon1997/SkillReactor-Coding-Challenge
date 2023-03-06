import React,{useEffect,useState} from 'react'
import Modal from '../Modal/Modal';
import "./Main.css"

function Main() {
    interface Idata{
      imageName?: string,
      imgLink?:string
    }
    type dataType= Idata[];

    const getImages =async ()=>{
        const response=await fetch("http://localhost:3000/api/get");
        const data:dataType=await response.json();
        console.log(data)
        setImages([...data]);
    }

    const openModal =  (image:Idata) =>{
        console.log(image)
        setPropsData(image);
        setShowModal(true);      
    }
    const handleSearch = async() => {
        if(searchString!=null && searchString.length>0){
            const response= await fetch(`http://localhost:3000/api/get/name/${searchString}`);
            const data= await response.json();
            setImages([...data])
        }
    }
    const handleCloseModal=()=>{
        setShowModal(false)
    }
    const [images,setImages]=useState<dataType>();
    const [showModal,setShowModal]=useState<boolean>();
    const [propsData,setPropsData]=useState<Idata>();
    const [searchString,setSearchString]=useState<string>('');

    useEffect(()=>{
        getImages();
    },[])


    return (
        <div>
            <div>
            <input type="text" name="name" id="name" placeholder="Type name here to search.... " value={searchString} onChange={(e)=> setSearchString(e.target.value)}/>
            <button onClick={()=> handleSearch()}>Search</button>
            </div>
            <div className="images-container" style={{ opacity : showModal?  0.1:1}}>
                {
                    images?.map((image: Idata)=>{
                        return (
                            <div className="image-box" onClick={()=> openModal(image)}>
                                <div>
                                <img className="imageMain" src={image.imgLink} alt="" />
                                </div>
                                <div>
                                    <p>{image.imageName}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {showModal && <Modal imageName={propsData?.imageName} imgLink={propsData?.imgLink} handleCloseModal={handleCloseModal} />}
        </div>
    )
}

export default Main
