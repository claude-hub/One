import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:one_app/app/pages/main/controller.dart';

class MainPage extends GetView<MainController> {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
          child: Obx(() => IndexedStack(
                index: controller.activeIndex.value,
                children: controller.pages,
              )),
        ),
        bottomNavigationBar: Obx(() => BottomNavigationBar(
              currentIndex: controller.activeIndex.value,
              items: _listItems(),
              onTap: controller.setIndex,
            )));
  }

  List<BottomNavigationBarItem> _listItems() {
    return [
      const BottomNavigationBarItem(
        icon: Icon(Icons.home),
        label: 'Home',
      ),
      const BottomNavigationBarItem(
        icon: Icon(Icons.person),
        label: 'Profile',
      ),
    ];
  }
}
