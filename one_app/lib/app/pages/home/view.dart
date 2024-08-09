import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:one_app/app/pages/home/controller.dart';
import 'package:one_app/app/routes/route_config.dart';

class HomePage extends GetView<HomeController> {
  const HomePage({super.key});

  void onTap() {
    Get.toNamed(RouteConfig.music);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Column(children: [
        ElevatedButton(
          // 按钮点击count值++
          onPressed: onTap,
          child: const Text("Music"),
        ),
      ])),
    );
  }
}
