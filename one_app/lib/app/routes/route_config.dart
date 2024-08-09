import 'package:get/get.dart';
import 'package:one_app/app/modules/music/controller.dart';
import 'package:one_app/app/modules/music/view.dart';
import 'package:one_app/app/pages/main/controller.dart';
import 'package:one_app/app/pages/main/view.dart';

/// 路由配置
abstract class RouteConfig {
  static const String home = "/";
  static const String mine = "/mine";
  static const String music = "/music";

  static final List<GetPage> getPages = [
    GetPage(
      name: home,
      page: () => const MainPage(),
      binding: BindingsBuilder(() {
        Get.lazyPut(() => MainController());
      }),
    ),
    GetPage(
      name: music,
      page: () => const MusicHomePage(),
      binding: BindingsBuilder(() {
        Get.lazyPut(() => MusicHomeController());
      }),
    ),
  ];
}
