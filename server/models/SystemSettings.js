import mongoose from 'mongoose';

const systemSettingsSchema = new mongoose.Schema(
    {
        maintenanceMode: {
            type: Boolean,
            default: false
        },
        contactEmail: {
            type: String,
            default: 'contact@faizanemadina.com'
        },
        contactPhone: {
            type: String,
            default: '+1234567890'
        },
        address: {
            type: String,
            default: 'Faizan-E-Madina Sunni Masjid Complex'
        },
        socialLinks: {
            facebook: { type: String, default: '' },
            twitter: { type: String, default: '' },
            instagram: { type: String, default: '' },
            youtube: { type: String, default: '' }
        }
    },
    { timestamps: true }
);

// We want this to be a singleton.
systemSettingsSchema.statics.getSingleton = async function () {
    let settings = await this.findOne();
    if (!settings) {
        settings = await this.create({});
    }
    return settings;
};

export default mongoose.model('SystemSettings', systemSettingsSchema);
