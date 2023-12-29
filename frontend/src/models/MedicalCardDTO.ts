class MedicalCardDTO {
    id?: number;
    latestReport?: string;
    latestDisease?: string;
    diseaseDescription?: string;
    newestResults?: any;

    constructor(id: number, latestRepost: string, latestDisease: string, diseaseDescription: string, newestResults: any) {
        this.id = id;
        this.latestReport = latestRepost;
        this.latestDisease = latestDisease;
        this.diseaseDescription = diseaseDescription;
        this.newestResults = newestResults;
    }
}

export default MedicalCardDTO;