import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:one_app/app/pages/home/controller.dart';
import 'package:one_app/app/pages/home/view.dart';
import 'package:one_app/app/pages/mine/controller.dart';
import 'package:one_app/app/pages/mine/view.dart';

class MainController extends GetxController {
  // 当前激活的页面下标
  var activeIndex = 0.obs;

  // 使用 SizeBox 占位，切换了页面后，才会初始化页面。
  RxList<Widget> pages = RxList<Widget>([
    const SizedBox(),
    const SizedBox(),
    const SizedBox(),
    const SizedBox(),
  ]);

  void setIndex(int i) {
    if (pages[i] is SizedBox) {
      switch (i) {
        case 0:
          Get.put(HomeController());
          pages[i] = const HomePage();
          break;
        case 1:
          Get.put(MineController());
          pages[i] = const MinePage();
          break;
        default:
      }
    }

    activeIndex.value = i;
  }

  @override
  void onInit() {
    // 初始化，默认选中首页
    setIndex(0);
    super.onInit();
  }
}
