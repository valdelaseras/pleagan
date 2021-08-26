import { Injectable } from '@angular/core';
import { DeviceUUID } from 'device-uuid';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  static UUID = (() => {
    const deviceUUID = new DeviceUUID().parse();
    const attributes = [
      deviceUUID.language,
      deviceUUID.platform,
      deviceUUID.os,
      deviceUUID.cpuCores,
      deviceUUID.isAuthoritative,
      deviceUUID.silkAccelerated,
      deviceUUID.isKindleFire,
      deviceUUID.isDesktop,
      deviceUUID.isMobile,
      deviceUUID.isTablet,
      deviceUUID.isWindows,
      deviceUUID.isLinux,
      deviceUUID.isLinux64,
      deviceUUID.isMac,
      deviceUUID.isiPad,
      deviceUUID.isiPhone,
      deviceUUID.isiPod,
      deviceUUID.isSmartTV,
      deviceUUID.pixelDepth,
      deviceUUID.isTouchScreen
    ];

    return deviceUUID.hashMD5( attributes.join( ':' ) )
  })();
}
