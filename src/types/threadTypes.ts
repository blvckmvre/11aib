export interface IAttach {
    filename: string;
    path: string;
    thumbnail: string;
}

export interface IReply {
    thread_id: number;
    post_id: number;
    post_contents: string;
    created_on: string;
    post_pics: IAttach[] | null;
}

export interface IThread {
    id: number;
    title: string;
    contents: string;
    created_on: string;
    bumped_on: string;
    attach: IAttach[] | null;
    replies: IReply[];

    total_count: number;
}
/* 
export interface IThreadState {
    threads: IThread[],
    isLoading: boolean;
    error: string | null;
    count: number;
    page: number;
    limit: number;
}
 */