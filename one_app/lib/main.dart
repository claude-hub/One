import 'package:flutter/material.dart';
import 'package:one_app/mobile/widgets/tab_page.dart';
import 'package:one_app/src/rust/frb_generated.dart';

Future<void> main() async {
  await RustLib.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: TabPage(),
    );
  }
}
