import { HydrateService } from './hydrate.service';
export declare class HydrateController {
    private readonly hydrateService;
    constructor(hydrateService: HydrateService);
    stopHydrating(): void;
    startHydrating(): Promise<void>;
    hydrationReport(): Promise<string>;
}
