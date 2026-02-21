import mongoose from "mongoose";
import dotenv from "dotenv";
import { Company } from "../models/company.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedCompanies = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected");

        // Purani companies delete karega
        await Company.deleteMany();

        const companies = [
            {
                name: "TechNova Solutions",
                description: "MERN stack and cloud-based application development company.",
                website: "https://technova.com",
                location: "Bangalore, India",
                userId: new mongoose.Types.ObjectId("6998d3d5974b671274bb0ba5"),
            },
            {
                name: "InnoSoft Technologies",
                description: "AI and Machine Learning focused IT company.",
                website: "https://innosoft.com",
                location: "Hyderabad, India",
                userId: new mongoose.Types.ObjectId("6998ced2e576c971b6bb9f18"),
            },
            {
                name: "CodeCraft Pvt Ltd",
                description: "Custom web and backend application development.",
                website: "https://codecraft.com",
                location: "Pune, India",
                userId: new mongoose.Types.ObjectId("6998d3d5974b671274bb0ba5"),
            },
            {
                name: "NextGen Systems",
                description: "Enterprise SaaS and DevOps solutions provider.",
                website: "https://nextgensystems.com",
                location: "Mumbai, India",
                userId: new mongoose.Types.ObjectId("6998ced2e576c971b6bb9f18"),
            },
            {
                name: "Digital Hive",
                description: "Digital solutions and scalable web platform builder.",
                website: "https://digitalhive.com",
                location: "Delhi, India",
                userId: new mongoose.Types.ObjectId("6998d3d5974b671274bb0ba5"),
            },
            {
                name: "Skyline Tech",
                description: "Cloud-native microservices development company.",
                website: "https://skylinetech.com",
                location: "Chennai, India",
                userId: new mongoose.Types.ObjectId("6998ced2e576c971b6bb9f18"),
            },
            {
                name: "AlphaByte Labs",
                description: "AI-driven eCommerce product development startup.",
                website: "https://alphabyte.com",
                location: "Ahmedabad, India",
                userId: new mongoose.Types.ObjectId("6998d3d5974b671274bb0ba5"),
            },
            {
                name: "FusionStack Technologies",
                description: "Full-stack development and consulting services.",
                website: "https://fusionstack.com",
                location: "Indore, India",
                userId: new mongoose.Types.ObjectId("6998ced2e576c971b6bb9f18"),
            },
            {
                name: "BlueWave IT Services",
                description: "Scalable backend systems and API development firm.",
                website: "https://bluewaveit.com",
                location: "Noida, India",
                userId: new mongoose.Types.ObjectId("6998d3d5974b671274bb0ba5"),
            },
            {
                name: "QuantumCode Labs",
                description: "Next-generation web platforms and research-based software.",
                website: "https://quantumcode.com",
                location: "Jaipur, India",
                userId: new mongoose.Types.ObjectId("6998ced2e576c971b6bb9f18"),
            },
        ];

        // 🔥 Automatic Logo Generation
        companies.forEach(company => {
            company.logo = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&size=200&background=random`;
        });

        await Company.insertMany(companies);

        console.log("🚀 Companies Seeded Successfully");
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding companies:", error);
        process.exit(1);
    }
};

seedCompanies();