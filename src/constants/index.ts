import { Subject } from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        department: "Computer Science",
        description: "Basic principles of programming and algorithms.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        code: "MATH201",
        name: "Linear Algebra",
        department: "Mathematics",
        description: "Matrix theory, vector spaces, and linear transformations.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        code: "PHY110",
        name: "General Physics",
        department: "Physics",
        description: "Fundamentals of mechanics, waves, and thermodynamics.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 4,
        code: "ENG150",
        name: "Academic Writing",
        department: "English",
        description: "Developing clear and effective academic writing skills.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 5,
        code: "BUS220",
        name: "Principles of Marketing",
        department: "Business",
        description: "Core concepts of marketing strategies and consumer behavior.",
        createdAt: new Date().toISOString(),
    },
];

export const DEPARTMENT = [
    'CS',
    'Math',
    'English'
];

export const DEPARTMENT_OPTIONS = DEPARTMENT.map(dept => ({
    label: dept,
    value: dept}));

export const GRADE = [
]