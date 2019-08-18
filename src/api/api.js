/**   
 * api接口统一管理
 */
import http from './http'

export default {
    // 查询视频目录树
    queryVideoTree() {
        return http.get('camera/queryTree', {});
    }    
}

