import {Maybe} from "./types";

export interface YTDResults {
    data: YTDData;
    status: number;
    statusText: string;
    headers: YTDHeaders;
    config: YTDConfig;
    request: YTDRequest;
}

export interface YTDData {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: YTDPageInfo;
    items?: YTDItem[] | null;
}

export interface YTDPageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface YTDItem {
    kind: string;
    etag: string;
    id: YTDId;
    snippet: YTDSnippet;
}

export interface YTDId {
    kind: string;
    videoId: string;
}

export interface YTDSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YTDThumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
}

export interface YTDThumbnails {
    default: YTDThumbnail;
    medium: YTDThumbnail;
    high: YTDThumbnail;
}

export interface YTDThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface YTDHeaders {
    date: string;
    "content-encoding": string;
    "content-length": string;
    expires: string;
    server: string;
    etag: string;
    "content-type": string;
    vary: string;
    "cache-control": string;
}

export interface YTDConfig {
    url: string;
    method: string;
    params: YTDParams;
    headers: YTDHeaders1;
    baseURL: string;
    transformRequest?: (null)[] | null;
    transformResponse?: (null)[] | null;
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
}

export interface YTDParams {
    q: string;
    part: string;
    maxResults: number;
    key: string;
}

export interface YTDHeaders1 {
    Accept: string;
}

export interface YTDRequest {
    body: Maybe<string>;
    headers: any;
    results: Maybe<YTDData>;
    status: number;
    statusText: Maybe<string>
}
