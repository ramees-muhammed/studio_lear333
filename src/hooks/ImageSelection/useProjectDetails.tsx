// hooks/useProjectDetails.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface FolderItem {
    _id: string;
    project_name: string;
    status: string;
    project_id: string;
    event_id: string;
    event_name: string;
    folder_name: string;
    folder_id: string;
    folder_status: string;
    studio_count?: number;
}

interface EventItem {
    event_id: string;
    event_name: string;
}

interface Folder {
    folder_id: string;
    folder_name: string;
    folder_status: string;
    event_id: string;
    event_name: string;
    studio_count: number;
}

interface ResponseShape {
    data: {
        full: FolderItem[];
        events: EventItem[];
        folders: Folder[];
        selectedEventId: string;
    };
}

export const useProjectDetails = (projectid: string | null, selectedEventId?: string | null) => {
    return useQuery<ResponseShape>({
        // queryKey: ['projectDetails'],
        queryKey: ['projectDetails', projectid, selectedEventId],
        enabled: !!projectid,
        queryFn: async () => {
            const token = localStorage.getItem('jwtToken');
            const { data } = await axios.post<FolderItem[]>(
                'http://localhost:3000/api/album/projectDetails',
                { projectid },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Collect unique events
            const eventMap = new Map<string, string>();
            for (const item of data) {
                if (!eventMap.has(item.event_id)) {
                    eventMap.set(item.event_id, item.event_name);
                }
            }

            const events: EventItem[] = Array.from(eventMap.entries()).map(
                ([event_id, event_name]) => ({
                    event_id,
                    event_name,
                })
            );

            const activeEventId =
                selectedEventId && eventMap.has(selectedEventId)
                    ? selectedEventId
                    : events[0]?.event_id || '';

            const folders: Folder[] = data
                .filter((item) => item.event_id === activeEventId)
                .map((item) => ({
                    folder_id: item.folder_id,
                    folder_name: item.folder_name,
                    folder_status: item.folder_status,
                    event_id: item.event_id,
                    event_name: item.event_name,
                    studio_count: item.studio_count || 0,
                }));

            return {
                data: {
                    full: data,
                    events,
                    folders,
                    selectedEventId: activeEventId,
                },
            };
        },
    });
};



// // hooks/useProjectDetails.ts
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// interface FolderItem {
//     _id: string;
//     project_name: string;
//     status: string;
//     project_id: string;
//     event_id: string;
//     event_name: string;
//     folder_name: string;
//     folder_id: string;
//     folder_status: string;
//     studio_count?: number;
// }

// interface EventItem {
//     event_id: string;
//     event_name: string;
// }

// interface Folder {
//     folder_id: string;
//     folder_name: string;
//     folder_status: string;
//     event_id: string;
//     event_name: string;
//     studio_count: number;
// }

// interface ResponseShape {
//     data: {
//         full: FolderItem[];
//         events: EventItem[];
//         folders: Folder[];
//     };
// }

// export const useProjectDetails = (projectid: string | null) => {
//     return useQuery<ResponseShape>({
//         queryKey: ['projectDetails', projectid],
//         enabled: !!projectid,
//         queryFn: async () => {
//             const token = localStorage.getItem('jwtToken');
//             const { data } = await axios.post<FolderItem[]>('http://localhost:3000/api/album/projectDetails', {
//                 projectid,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             const eventMap = new Map<string, string>();
//             const folders: Folder[] = [];

//             for (const item of data) {
//                 // collect unique events
//                 if (!eventMap.has(item.event_id)) {
//                     eventMap.set(item.event_id, item.event_name);
//                 }

//                 // collect folder info
//                 folders.push({
//                     folder_id: item.folder_id,
//                     folder_name: item.folder_name,
//                     folder_status: item.folder_status,
//                     event_id: item.event_id,
//                     event_name: item.event_name,
//                     studio_count: item.studio_count || 0,
//                 });
//             }

//             const events: EventItem[] = Array.from(eventMap.entries()).map(([event_id, event_name]) => ({
//                 event_id,
//                 event_name,
//             }));

//             return {
//                 data: {
//                     full: data,
//                     events,
//                     folders,
//                 },
//             };
//         },
//     });
// };
