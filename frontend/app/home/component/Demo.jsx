'use client';
import { useState } from 'react';

export default function Demo() {
    const [formData, setFormData] = useState({
        study_hours_per_day: '',
        attendance_percentage: '',
        social_media_hours: '',
        netflix_hours: '',
        part_time_job: 'False',
        sleep_hours: '',
        extracurricular_participation: 'False',
    });

    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDemoSubmit = async (e) => {
        e.preventDefault();
        setError('')
        const hasEmptyField = Object.values(formData).some(
            (value) => value === '' || value === null || value === undefined
        );

        if (hasEmptyField) {
            setError('Please enter all fields');
            return;
        }
        setLoading(true);
        try {
            const payload = {
                ...formData,
                study_hours_per_day: parseFloat(formData.study_hours_per_day),
                attendance_percentage: parseFloat(formData.attendance_percentage),
                social_media_hours: parseFloat(formData.social_media_hours),
                netflix_hours: parseFloat(formData.netflix_hours),
                sleep_hours: parseFloat(formData.sleep_hours),
                part_time_job: formData.part_time_job === 'True',
                extracurricular_participation: formData.extracurricular_participation === 'True',
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/demo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("Status:", response.status);
            console.log("Response:", data);

            setScore(data.prediction);

        } catch (err) {
            console.error(err);
            setError('Something went wrong. Try again!')
        } finally {
            setLoading(false);
        }
    };

    const numeric = [
        { name: 'study_hours_per_day', label: 'Hours of daily study' },
        { name: 'attendance_percentage', label: 'Attendance Percentage' },
        { name: 'social_media_hours', label: 'Social Media time' },
        { name: 'netflix_hours', label: 'TV/Streaming time' },
        { name: 'sleep_hours', label: 'Average sleep taken' },
    ];

    const boolean = [
        { name: 'part_time_job', label: 'Part Time Job' },
        { name: 'extracurricular_participation', label: 'Extracurricular' },
    ];

    return (
        <div className="flex flex-col items-center">
            

            <form onSubmit={handleDemoSubmit} className="w-full max-w-md rounded-xl shadow-lg p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    {numeric.map((field) => (
                        <div key={field.name} className="flex flex-col gap-2">
                            <label htmlFor={field.name} className="sm:text-xs md:text-sm font-medium text-[#bcefc7]">
                                {field.label}
                            </label>
                            <input
                                type="number"
                                step="any"
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="border text-white border-emerald-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            
                            />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {boolean.map((field) => (
                        <div key={field.name} className="flex flex-col gap-2">
                            <label htmlFor={field.name} className="sm:text-xs md:text-sm text-[#bcefc7] font-medium">
                                {field.label}
                            </label>
                            <select
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="text-white border border-emerald-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            >
                                <option value="True" className="text-black">True</option>
                                <option value="False" className="text-black">False</option>
                            </select>
                        </div>
                    ))}
                </div>
                {error&&(
                    <p className="text-red-400 text-sm text-center">{error}</p>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-xl bg-emerald-500 text-white font-medium px-5 py-3 rounded-md duration-300 ease-in-out hover:cursor-pointer hover:-translate-y-1.5"
                >
                    {loading ? 'Predicting...' : 'Submit'}
                </button>
            </form>

            {score !== null && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Predicted Exam Score</p>
                    <p className="text-3xl font-semibold text-emerald-600">{score}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        Expected range: {Math.max(0, score - 10)} to {Math.min(100, score + 10)}
                    </p>
                </div>
            )}
            <p className='md:text-md sm:text-xs px-3 align-center text-white '>To maintain your progress and observe personal dashboard, please register and login.</p>
        </div>
    );
}