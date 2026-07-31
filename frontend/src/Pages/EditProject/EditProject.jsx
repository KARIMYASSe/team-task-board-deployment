// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useParams } from "react-router-dom"

// export default function EditProject() {

//     let {register , handleSubmit ,reset}= useForm()
//     let {id} = useParams()
    

//     async function updateProjectHandle(value) {
//   const token = localStorage.getItem("token");

//   const { data, status } = await axios.patch(
//     `http://localhost:3000/projects/${id}`,
//     value,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );

//   if (status === 200) {
//     setProject(data);

//     reset({
//       name: data.name,
//       description: data.description,
//     });

//     setIsEditing(false);
//   }
// }
//   return (
//     <div>EditProject</div>
//   )
// }
