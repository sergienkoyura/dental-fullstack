class PricingDTO {
    id: number;
    service: string;
    category: string;
    cost: number;
    time: string;
    constructor(service: string, category: string, cost: number, time: string, id: number) {
        this.id = id;
        this.service = service;
        this.category = category;
        this.cost = cost;
        this.time = time;
    }
}

export default PricingDTO;