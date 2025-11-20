import request from '@/utils/request'

export const findProjectList = (data) =>
    request({ url: '/project/list-page', method: 'post', data })
export const addProject = (data) => request({ url: '/project', method: 'POST', data })
export const updateProject = (data) => request({ url: '/project', method: 'PUT', data })
export const deleteBuildInfo = (ids) => request({ url: `/project/${ids}`, method: 'DELETE' })
export const findProjectById = (id) =>
    request({
        url: `/project/${id}`,
        method: 'GET',
    })
export const findDefaultProject = () => request({ url: `/project/choose`, method: 'GET' })
