import React from 'react';

const Select = (props) => {
    return (
        <div className="flex flex-col">
            <label className="text-[#333333] opacity-70 font-semibold text-[14px]">{props?.label}</label>
            <select className="focus:outline-none border-[1px] text-[14px] rounded-[4px] p-[10px] mt-[5px]"
                name={props.name}
                onChange={(e) => props.handleChange(e)}
                value={props.value}
                disabled={props.disabled}
            >
                <option className='text-[#000]/[0.5]' value={''}>{props.placeholder || 'Select Option'}</option>
                {
                    props?.options?.map((item, index) => {
                        return <option key={index} value={item.value}>{item.label}</option>;
                    })
                }
            </select>
        </div>
    );
}

export default Select;
