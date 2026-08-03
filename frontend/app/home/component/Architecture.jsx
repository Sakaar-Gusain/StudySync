import {
    FaUserGraduate,
    FaKeyboard,
    FaServer,
    FaBrain,
    FaChartLine,
} from "react-icons/fa";

const steps = [
    {
        icon: <FaUserGraduate size={30} />,
        title: "Student",
        desc: "The student opens StudySync and chooses to predict their expected exam score.",
    },
    {
        icon: <FaKeyboard size={30} />,
        title: "Enter Daily Habits",
        desc: "Fill in details like study hours, attendance, sleep, social media usage, extracurricular activities.",
    },
    {
        icon: <FaServer size={30} />,
        title: "Backend Processing",
        desc: "The data is sent securely to the FastAPI backend where it is validated and prepared for prediction.",
    },
    {
        icon: <FaBrain size={30} />,
        title: "Machine Learning Prediction",
        desc: "A trained Linear Regression model analyzes the habits and predicts the student's expected exam score range.",
    },
    {
        icon: <FaChartLine size={30} />,
        title: "Dashboard & Insights",
        desc: "The prediction is stored and displayed in a personalized dashboard so students can monitor their progress over time.",
    },
];

export default function Architecture() {
    return (
        <section className="bg-[#0b1112] py-24 px-6">
            <div className="mx-auto max-w-6xl">

                <h2 className="text-center md:text-5xl text-3xl py-4 font-bold bg-linear-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
                    How StudySync Works
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-center text-gray-400">
                    StudySync combines your daily study habits with Machine Learning to
                    provide personalized exam score predictions and long-term academic
                    insights.
                </p>

                <div className="relative mt-20">

                    {/* Vertical Line */}
                    <div className="absolute left-6 top-0 h-full w-1 bg-emerald-700 md:left-1/2 md:-translate-x-1/2"></div>

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`relative flex items-center mb-12 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                                } justify-start`}
                        >
                            {/* Icon */}
                            <div
                                className={`absolute left-6 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-linear-to-r from-emerald-500 to-lime-400 text-zinc-900 flex items-center justify-center font-bold z-10`}
                            >
                                {step.icon}
                            </div>

                            {/* Card */}
                            <div className="w-full pl-12 md:pl-6 md:w-[45%] rounded-2xl border border-emerald-800 bg-[#141b1c] p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-emerald-900">
                                <h3 className="mb-3 text-2xl font-semibold text-emerald-300">
                                    {step.title}
                                </h3>
                                <p className="leading-7 text-gray-300">{step.desc}</p>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}