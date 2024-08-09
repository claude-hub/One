import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:one_app/app/pages/mine/controller.dart';
import 'package:one_app/src/rust/api/init.dart';

class MinePage extends GetView<MineController> {
  const MinePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Column(children: [
        Obx(() => Text(
              "count的值为：${controller.count}",
              style: const TextStyle(color: Colors.redAccent, fontSize: 20),
            )),
        GetX<MineController>(
          builder: (controller) {
            return Text(
              "count的值为：${controller.count}",
              style: const TextStyle(color: Colors.redAccent, fontSize: 20),
            );
          },
        ),
        Text(
            'Action: Call Rust `greet("Tom")`\nResult: `${greet(name: "Tom")}`'),
        ElevatedButton(
          // 按钮点击count值++
          onPressed: () => controller.increase(),
          child: const Text("点击count++"),
        ),
        Expanded(
            child: ListView.builder(
          itemBuilder: (context, index) {
            return Text('111');
          },
          itemCount: 20,
        ))
      ])),
    );
  }
}
