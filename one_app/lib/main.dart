import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:one_app/app/routes/route_config.dart';
import 'package:one_app/src/rust/frb_generated.dart';

Future<void> main() async {
  await ScreenUtil.ensureScreenSize();
  await RustLib.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
        designSize: const Size(360, 690),
        minTextAdapt: true,
        splitScreenMode: true,
        builder: (context, child) {
          return GetMaterialApp(
            title: '道一',
            initialRoute: RouteConfig.home,
            getPages: RouteConfig.getPages,
            debugShowCheckedModeBanner: false,
            // theme: AppTheme.light,
            // home: const MainPage(),
          );
        });
  }
}
