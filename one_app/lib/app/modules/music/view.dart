import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:one_app/app/modules/music/controller.dart';

class MusicHomePage extends GetView<MusicHomeController> {
  const MusicHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Music Home'),
      ),
      body: SafeArea(
        child: Text(controller.title),
      ),
    );
  }
}
