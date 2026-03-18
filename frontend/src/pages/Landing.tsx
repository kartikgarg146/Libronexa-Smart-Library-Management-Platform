import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import logo from "../assets/logo.png";

function Landing(): JSX.Element {

const [dark,setDark] = useState<boolean>(false);

/* PARTICLES FIXED (no rerender flicker) */

const particles = useMemo(()=>Array.from({length:35}),[]);

/* ROTATING HERO IMAGES */

const heroImages = [
"https://images.unsplash.com/photo-1507842217343-583bb7270b66",
"https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
"https://images.unsplash.com/photo-1512820790803-83ca734da794",
"https://images.unsplash.com/photo-1569511166187-97eb6e387e19"
];

const [currentImage,setCurrentImage] = useState(0);

useEffect(()=>{
const interval=setInterval(()=>{
setCurrentImage((prev)=>(prev+1)%heroImages.length);
},5000);
return ()=>clearInterval(interval);
},[]);


/* DARK MODE */

useEffect(()=>{
const theme = localStorage.getItem("theme");

if(theme==="dark"){
document.documentElement.classList.add("dark");
setDark(true);
}else{
document.documentElement.classList.remove("dark");
}
},[]);

const toggleDark = (): void => {

if(dark){
document.documentElement.classList.remove("dark");
localStorage.setItem("theme","light");
setDark(false);
}else{
document.documentElement.classList.add("dark");
localStorage.setItem("theme","dark");
setDark(true);
}
};


/* ANIMATION */

const fade={
hidden:{opacity:0,y:40},
visible:{opacity:1,y:0,transition:{duration:0.6}}
};

return(

<div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition relative overflow-hidden">

{/* FLOATING PARTICLES */}

<div className="absolute inset-0 -z-10 overflow-hidden">

{particles.map((_,i)=>(
<div
key={i}
className="absolute w-[3px] h-[3px] bg-blue-400 rounded-full opacity-40 animate-ping"
style={{
top:`${Math.random()*100}%`,
left:`${Math.random()*100}%`,
animationDuration:`${4+Math.random()*6}s`
}}
/>
))}

</div>


{/* GRADIENT BACKGROUND */}

<div className="absolute inset-0 -z-10 opacity-20 blur-3xl animate-pulse bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"></div>


{/* NAVBAR */}

<header className="bg-white dark:bg-gray-900 shadow">

<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

<div className="flex items-center gap-3">

<img
src={logo}
className="h-9 w-auto object-contain"
alt="Libronexa Logo"
/>

<h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
Libronexa
</h1>

</div>

<div className="flex gap-3 items-center">

<button
onClick={toggleDark}
className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:-translate-y-1 hover:shadow-lg transition"
>
{dark ? "☀️" : "🌙"}
</button>

<Link
to="/login"
className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:-translate-y-1 hover:shadow-lg transition"
>
Login
</Link>

<Link
to="/register"
className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition"
>
Register
</Link>

</div>
</div>
</header>


{/* HERO */}

<section
className="min-h-[85vh] flex items-center justify-center text-center bg-cover bg-center relative transition-all duration-1000"
style={{backgroundImage:`url(${heroImages[currentImage]})`}}
>

<div className="absolute inset-0 bg-black/60"></div>

<motion.div
variants={fade}
initial="hidden"
animate="visible"
className="relative max-w-4xl text-white px-6"
>

<div className="bg-black/30 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/10">

<h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-pulse">
Smart Library Management
</h2>

<p className="text-lg leading-relaxed text-gray-200">
Libronexa is a modern digital platform designed to simplify library
management for both users and administrators.
Users can explore books, request borrowing and track reading
history while administrators manage inventory, approvals and
analytics using a powerful dashboard.
</p>

</div>

</motion.div>

</section>


{/* SAAS STATS */}

<section className="py-20 bg-gray-50 dark:bg-gray-900">

<div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">

{[
["5000+","Books Available"],
["1200+","Active Users"],
["3500+","Books Borrowed"],
["99%","User Satisfaction"]
].map((stat,i)=>(

<motion.div
key={i}
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{duration:0.6}}
className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-purple-400/40 shadow-lg hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition"
>

<h3 className="text-4xl font-bold text-blue-500 mb-2">
{stat[0]}
</h3>

<p className="text-gray-600 dark:text-gray-300">
{stat[1]}
</p>

</motion.div>

))}

</div>
</section>


{/* POPULAR BOOKS */}

<section className="py-24 bg-gray-50 dark:bg-gray-950 relative">

<div className="max-w-7xl mx-auto px-6">

<motion.h2
variants={fade}
initial="hidden"
whileInView="visible"
viewport={{once:true}}
className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
>
Popular Books
</motion.h2>


<div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">

{[

{title:"Clean Code",author:"Robert C. Martin",img:"https://images-na.ssl-images-amazon.com/images/I/41SH-SvWPxL.jpg"},
{title:"The Pragmatic Programmer",author:"Andrew Hunt",img:"https://images-na.ssl-images-amazon.com/images/I/41as+WafrFL.jpg"},
{title:"Design Patterns",author:"Erich Gamma",img:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQneLKN9piywlFNwHdxfNPhcSc0sE84ydlM5-CPXcSLEo2OKwmUw9lpCKvnMOglp9DDgVwRhd8cricZSEZDpaxyptmHIUDT1rG2OjN79Qh3Ze_hRJmYJZWw&usqp=CAc"},
{title:"Introduction to Algorithms",author:"Thomas Cormen",img:"data:image/jpeg;base64,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"},
{title:"Refactoring",author:"Martin Fowler",img:"data:image/jpeg;base64,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"}

].map((book,index)=>(

<div
key={index}
className="snap-center min-w-[260px] group bg-white dark:bg-gray-900 border border-purple-500/40 rounded-xl shadow-lg p-6 text-center hover:-translate-y-3 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition"
>

<img
src={book.img}
className="h-56 mx-auto mb-4 transition duration-300 group-hover:scale-105"
/>

<h3 className="font-semibold text-lg text-gray-900 dark:text-white">
{book.title}
</h3>

<p className="text-gray-500 text-sm">
{book.author}
</p>

</div>

))}

</div>

</div>
</section>


{/* HOW LIBRONEXA WORKS */}

<section className="py-24 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-950">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-3xl font-bold text-center mb-14 text-gray-900 dark:text-white">
How Libronexa Works
</h2>

<div className="grid md:grid-cols-3 gap-8 text-center">

{[
["Explore Books","Browse thousands of books across multiple categories."],
["Request Borrow","Send borrow requests easily and track approval."],
["Admin Management","Admins manage books, approvals and analytics."]
].map((item,i)=>(

<motion.div
key={i}
whileHover={{y:-10}}
className="bg-white dark:bg-gray-800 border border-purple-400/50 rounded-xl shadow-lg p-6 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition"
>

<h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
{item[0]}
</h3>

<p className="text-gray-700 dark:text-gray-300">
{item[1]}
</p>

</motion.div>

))}

</div>

</div>
</section>


{/* WHY CHOOSE LIBRONEXA */}

<section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-3xl font-bold text-center mb-14 text-gray-900 dark:text-white">
Why Choose Libronexa
</h2>

<div className="grid md:grid-cols-3 gap-8">

{[
["Smart Search","Find books instantly using advanced search."],
["Borrow Management","Track borrow requests and approvals easily."],
["Admin Analytics","Powerful analytics dashboard."],
["Secure System","Role based access keeps data safe."],
["Real-time Updates","Instant updates for approvals."],
["Modern UI","Responsive and intuitive interface."]
].map((item,i)=>(

<motion.div
key={i}
whileHover={{y:-10}}
className="bg-white dark:bg-gray-900 border border-pink-400/40 p-6 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition"
>

<h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
{item[0]}
</h3>

<p className="text-gray-700 dark:text-gray-300">
{item[1]}
</p>

</motion.div>

))}

</div>

</div>
</section>


{/* FOOTER */}

<footer className="py-6 text-center bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
© 2025 Libronexa • Smart Library Management Platform
</footer>

</div>
);
}

export default Landing;