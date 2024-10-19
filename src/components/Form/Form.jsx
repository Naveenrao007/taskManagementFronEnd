// import React from "react";

// function FormFields({ name, type, placeholder, value, onChange, label }) {
//   return (
//     <>
//       <input
//         name={name}
//         value={value}
//         onChange={onChange}
//         type={type}
//         placeholder={placeholder}
//       />
//       {label ? <label  htmlFor={name}>{label} </label> : null}
//     </>
//   );
// }
// function Form({ formFields, onSubmit, error, errorMessages, button }) {
//   console.log(button);

//   return (
//     <form onSubmit={onSubmit} className="flex flex-col  m-auto">
//       {formFields.map((item) => (
//         <React.Fragment key={item.name}>
//           {item.type === "checkbox" ? (
//             <div className="flex mrtop1rem flex-row gap1rem">
//               <FormFields
//                 name={item.name}
//                 type={item.type}
//                 placeholder={item.placeholder}
//                 value={item.value}
//                 onChange={item.onChange}
//                 label={item?.label}
//               />
//               {error[item.name] ? (
//                 <p> {errorMessages[item.name].message}</p>
//               ) : null}
//             </div>
//           ) : (
//             <div className="">
//               <FormFields
//                 name={item.name}
//                 type={item.type}
//                 placeholder={item.placeholder}
//                 value={item.value}
//                 onChange={item.onChange}
//                 label={item?.label}
//               />
//               {error[item.name] ? (
//                 <p> {errorMessages[item.name].message}</p>
//               ) : null}
//             </div>
//           )}
//         </React.Fragment>
//       ))}
//       <button
//         style={{
//           backgroundColor: button?.bgColor,
//           color: button?.color,
//           padding: button?.padding,
//           width: button?.width,
//           borderRadius: button?.radius,
//           border: button?.border,
//           fontSize: button?.font,
//           marginTop:button?.marginTop
//         }}
//         type={button?.type}
//       >
//         {button?.text}
//       </button>
//     </form>
//   );
// }

// export default Form;
