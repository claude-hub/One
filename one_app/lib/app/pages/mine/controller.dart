import 'package:get/get.dart';

class MineController extends GetxController {
  var count = 0.obs;

  void increase() => count.value++;
}
