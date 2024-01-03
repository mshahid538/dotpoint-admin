
import { responseEnum } from '@redux/utils/enum'
import { tostify } from './tostify'

export default function ErrorHandler(data: any) {    
    if (data?.payload?.status) {
        if (data?.payload?.status === responseEnum.InternalServerCode) {
            tostify(data?.payload?.message, "error")
            return false
        } else if (data?.payload?.status === responseEnum.ValidationCode) {
            tostify(data?.payload?.message, "error")
            return false
        } else if (data?.payload?.status === responseEnum.ValidationCode2) {
            tostify(data?.payload?.message, "error")
            return false
        } else if (data?.payload?.status === responseEnum.ValidationCode3) {
            tostify(data?.payload?.message, "error")
            return false
        } else if (data?.payload?.status === responseEnum.UnAuth) {
            tostify(data?.payload?.message, "error")
            localStorage.clear()
            window.location.href = '/'
            return false
        } else {
            return true
        }
    } else {
        tostify('Something went wrong!', "error")
        return false
    }
}