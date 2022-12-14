import React, { useState} from 'react';
import "../index.css";
import 'boxicons';

function upload_img(event, pinDetails, setPinDetails, setShowLabel, setShowModalPin) {
        if (event.target.files && event.target.files[0]) {
                if (/image\/*/.test(event.target.files[0].type)) {
                        const reader = new FileReader();

                        reader.onload = function() {
                                setPinDetails({
                                        ...pinDetails,
                                        img_blob: reader.result
                                });
                                setShowLabel(false);
                                setShowModalPin(true);
                        }
                        reader.readAsDataURL(event.target.files[0]);
                }
        }
}

function check_size(event) {
        const image = event.target;

        image.classList.add('pin_max_width');

        if (
                image.getBoundingClientRect().width < image.parentElement.getBoundingClientRect().width ||
                image.getBoundingClientRect().width < image.parentElement.getBoundingClientRect().height
        ) {
                image.classList.remove('pin_max_width');
                image.classList.add('pin_max_height');
        }

        image.style.opacity = 1;
}

// const check_size = document.querySelector("#image_input");
// var modals_pin = "";

// modals_pin.addEventListener("change", function(){
//         const reader = new FileReader();
//         reader.addEventListener("load", () => {
//                 upload_img = reader.result;
//                 document.querySelector("#display_image").style.backgroundImage = `url(${modals_pin})`
//         });
//         reader.readAsDataURL(this.files[0]);
// })

function save_pin(pinDetails, add_pin) {
        const users_data = {
                ...pinDetails,
                author: 'Jack',
                board: 'default',
                title: document.querySelector('#pin_title').value,
                description: document.querySelector('#pin_description').value,
                destination: document.querySelector('#pin_destination').value,
                pin_size: document.querySelector('#pin_size').value,
        }
        console.log(users_data)
        add_pin(users_data);
}

function Modal(props) {
        const [pinDetails, setPinDetails] = useState({
                author: '',
                board: '',
                title: '',
                description: '',
                destination: '',
                img_blob: '',
                pin_size: '',
        })
        const [showLabel, setShowLabel] = useState(true);
        const [showModalPin, setShowModalPin] = useState(false);

  return (
        <div className='add_pin_modal absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-9999  w-3/4 bg-gray-100 '>
        <div className='pin-modal-container object-center relative container mx-auto  bg-white w-10/12 h-5/6 border-8' id="">
                <div className=' grid grid-cols-2  h-96 '>

                        <div className='relative' id='left'>
                                <div className='section1'>
                                        <div className='mock-icon-container'>
                                        <box-icon name='dots-horizontal-rounded'></box-icon>    
                                        </div>
                                </div>

                                <div className='section2 absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 w-3/4 h-3/4  text-center text-black'>
                                        <label htmlFor='upload_img' id="upload_img_label" 
                                                        style={{
                                                                display: showLabel ? 'block' : 'none'
                                                        }}>
                                                    <div className='upload_img_container absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                                                            <div id='dotted_border'>
                                                                <div className='pint_mock_icon_container'>
                                                                         <box-icon name='up-arrow-circle'></box-icon>
                                                                </div>
                                                                <div className='w-full h-full'>Click to upload</div>
                                                                <div className='w-full'>Recommendation: Use high-quality .jpg</div>
                                                            </div>
                                                         </div>
                                                    <input onChange={event => upload_img(event, pinDetails, setPinDetails, setShowLabel, setShowModalPin)} type="file" name="upload_img" id="upload_img" />
                                        </label>

                                        <div className={`modals_pin w-full h-full ${showModalPin ? 'block' :  'hidden'}`}>
                                                <img  className='rounded object-cover w-full h-full object-center 'onLoad={check_size} src={pinDetails.img_blob} alt='pin_image' id='pin_image'></img>
                                        </div>
                                </div>

                                <div className='section3'>
                                        <div className='absolute  left-1/2 bottom-1 -translate-x-1/2 -translate-y-1/2 bg-gray-100 text-center  w-3/4 rounded'>Save from site</div>
                                </div>
                        </div>

                        <div className='relative' id='right'>
                                        <div className='section1'>
                                                <div className='bg-gray-100 select_size flex absolute top-1 right-1'>
                                                        <select defaultValue="Select" className="pin_size m-20px p-0 relative  overflow-hidden bg-gray-100 w-44 h-7 rounded" id='pin_size'>
                                                                <option value="">Select</option>
                                                                <option value="small  bg-gray-100 w-65 h-14  rounded">Small</option>
                                                                <option value="medium bg-gray-100 w-65 h-25  rounded">Medium</option>
                                                                <option value="large bg-gray-100 w-75 h-25 rounded">Large</option>
                                                                </select>
                                                                <div onClick={()=> save_pin(pinDetails, props.add_pin)} className='"save_pin" bg-red-500 text-center w-16 rounded text-white' id="save_pin">Save</div>
                                                </div>
                                        </div>

                                                <div className='absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                                                        <label>
                                                                Title
                                                                <input placeholder='Add your title'  type="text" className='text-m border-b-10 w-64  h-34 pb-7' id="pin_title" />
                                                        </label>

                                                        <label>
                                                                Pin Details
                                                                <input placeholder='Tell everyone what your pin is about' type="text" className='text-m border-b-3 border-gray-400 w-full   pb-7' id="pin_description" />
                                                        </label>

                                                        <label>
                                                                  Link
                                                                  <input placeholder='Add a destination link' type="text" className='text-m border-b-3 w-64  pb-7' id="pin_destination" />
                                                        </label>
                                                </div>
                
                                <div className='section3'>

                                </div>
                        </div>
                </div>
        </div>
</div>
  )
}

export default Modal;
