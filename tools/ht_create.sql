--
-- Table structure for table `xrk_users`
--

DROP TABLE IF EXISTS `xrk_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xrk_users` (
  `openid` varchar(64) NOT NULL COMMENT '微信返回的openid 唯一key',
  `unionid` varchar(64) DEFAULT NULL COMMENT '微信返回的unionid 唯一key,',
  `subscribe` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否订阅0 没有 1订阅',
  `nickname` varchar(64) NOT NULL COMMENT '昵称',
  `sex` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 未知 1 男 2 女性',
  `city` varchar(32) NOT NULL COMMENT '城市',
  `country` varchar(32) NOT NULL COMMENT '国家',
  `province` varchar(32) NOT NULL COMMENT '省',
  `headimgurl` varchar(512) NOT NULL COMMENT '头像路径',
  `groupid` tinyint(4) DEFAULT NULL COMMENT '分组id',
  `remark` varchar(32) DEFAULT NULL COMMENT '公众号对粉丝的备注',
  `language` varchar(8) NOT NULL COMMENT '用户语言',
  `subscribe_time` bigint(20) NOT NULL COMMENT '用户关注时间戳',
  `privilege` varchar(128) DEFAULT NULL COMMENT '用户特权信息,json 数组,如微信沃卡用户为（chinaunicom） ',
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息';

--
-- Table structure for table `xrk_schools`
--

DROP TABLE IF EXISTS `xrk_schools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xrk_schools` (
  `schoolid` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '教学点 id',
  `schoolname` varchar(64) NOT NULL COMMENT '名称',
  `schooladdress` varchar(200) NOT NULL COMMENT '地址',
  `schoolleader` varchar(16) NOT NULL COMMENT '负责人姓名',
  `schoolmobile` varchar(20) NOT NULL COMMENT '负责人手机',
  `schooldetails` varchar(1024) COMMENT '分校介绍',
  `schoolactive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '已开学1,未开学0',
  UNIQUE (`schoolname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学校';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xrk_schooladmins`
--

DROP TABLE IF EXISTS `xrk_schooladmins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xrk_schooladmins` (
  `schooladminid` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT  COMMENT '管理员 id',
  `schooladminname` varchar(16) NOT NULL COMMENT '姓名',
  `schooladminmobile` varchar(20) NOT NULL COMMENT '手机',
  `schooladminusex` tinyint(1) NOT NULL DEFAULT '2' COMMENT '0 未知 1 男 2 女性',
  `schoolid` INT UNSIGNED COMMENT '分校ID',
  `schooladminopenid` varchar(64) COMMENT '用户ID',
  `schooladminactive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '在职1,离职0',
  FOREIGN KEY (`schoolid`) REFERENCES xrk_schools(`schoolid`),
  FOREIGN KEY (`schooladminopenid`) REFERENCES xrk_users(`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学校管理员';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xrk_teachers`
--

DROP TABLE IF EXISTS `xrk_teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xrk_teachers` (
  `teacherid` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '教师 id',
  `teachername` varchar(16) NOT NULL COMMENT '教师姓名',
  `teachermobile` varchar(20) NOT NULL COMMENT '手机号码',
  `teacherusex` tinyint(1) NOT NULL DEFAULT '2' COMMENT '0 未知 1 男 2 女性',
  `teacherdetails` varchar(1024) COMMENT '教师介绍',
  `schoolid` INT UNSIGNED COMMENT '教学点ID',
  `teacheropenid` varchar(64) COMMENT '用户ID',
  `teacheractive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '在职1,离职0',
  FOREIGN KEY (`schoolid`) REFERENCES xrk_schools(`schoolid`),
  FOREIGN KEY (`teacheropenid`) REFERENCES xrk_users(`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='教师';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xrk_courses`
--

DROP TABLE IF EXISTS `xrk_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xrk_courses` (
  `courseid` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '课程 id',
  `coursename` varchar(64) NOT NULL COMMENT '名称',
  `coursedetails` varchar(1024) COMMENT '课程介绍',
  `courseactive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '有效1,失效0',
  UNIQUE (`coursename`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='课程';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xrk_classes`
--

DROP TABLE IF EXISTS `xrk_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xrk_classes` (
  `classid` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '班级 id',
  `classname` varchar(64) NOT NULL COMMENT '名称',
  `classdate` varchar(200) COMMENT '上课日期',
  `classtime` varchar(200) COMMENT '上课时间',
  `classnumusers` int(1) NOT NULL COMMENT '上课当前人数',
  `classmaxnumusers` int(1) NOT NULL COMMENT '上课最大人数',
  `courseid` INT UNSIGNED COMMENT '课程ID',
  `teacherid` INT UNSIGNED COMMENT '教师ID',
  `schoolid` INT UNSIGNED COMMENT '教学点ID',
  `classdetails` varchar(1024) COMMENT '班级备注',
  `classactive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '有效1,失效0',
  UNIQUE  (`classname`),
  FOREIGN KEY (`courseid`) REFERENCES xrk_courses(`courseid`),
  FOREIGN KEY (`teacherid`) REFERENCES xrk_teachers(`teacherid`),
  FOREIGN KEY (`schoolid`) REFERENCES xrk_schools(`schoolid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='班级';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xrk_classcards`
--

DROP TABLE IF EXISTS `xrk_classcards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xrk_classcards` (
  `classcardid` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '课卡 id',
  `classcardname` varchar(100) NOT NULL COMMENT '名称',
  `classcardprice` int(1) NOT NULL COMMENT '价格 单位人民币',
  `classcardtimes` int(1) NOT NULL COMMENT '课时次数',
  `classcardtime` int(1) NOT NULL COMMENT '课时分钟',
  `courseid` INT UNSIGNED COMMENT '课程ID',
  `classcarddetails` varchar(1024) COMMENT '课卡备注',
  `classcardactive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '有效1,失效0',
  UNIQUE  (`classcardname`),
  FOREIGN KEY (`courseid`) REFERENCES xrk_courses(`courseid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='课卡';
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `xrk_students`
--

DROP TABLE IF EXISTS `xrk_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xrk_students` (
  `studentid` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '学生 id',
  `studentname` varchar(16) NOT NULL COMMENT '学生姓名',
  `studentmobile` varchar(20) NOT NULL COMMENT '手机号码',
  `studentusex` tinyint(1) NOT NULL DEFAULT '2' COMMENT '0 未知 1 男 2 女性',
  `studentage` varchar(16) COMMENT '学生年龄',
  `studentdetails` varchar(1024) COMMENT '学生介绍',
  `classcardid` INT UNSIGNED COMMENT '课卡ID',
  `classid` INT UNSIGNED COMMENT '班级ID',
  `schoolid` INT UNSIGNED COMMENT '教学点ID',
  `purchaseid` INT UNSIGNED COMMENT '购买 id',
  `studentopenid` varchar(64) COMMENT '用户ID',
  `studenttimes` int(1) NOT NULL DEFAULT '0' COMMENT '剩余次数',
  `studentmaxtimes` int(1) NOT NULL DEFAULT '0' COMMENT '上课次数',
  `studentactive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '在上课1,已毕业0',
  FOREIGN KEY (`classcardid`) REFERENCES xrk_classcards(`classcardid`),
  FOREIGN KEY (`classid`) REFERENCES xrk_classes(`classid`),
  FOREIGN KEY (`schoolid`) REFERENCES xrk_schools(`schoolid`),
  FOREIGN KEY (`studentopenid`) REFERENCES xrk_users(`openid`),
  FOREIGN KEY (`purchaseid`) REFERENCES xrk_students(`purchaseid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学生';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `xrk_purchases`
--

DROP TABLE IF EXISTS `xrk_purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `xrk_purchases` (
  `purchaseid` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT  COMMENT '预学生 id',
  `purchasename` varchar(16) NOT NULL COMMENT '预学生姓名',
  `purchasemobile` varchar(20) NOT NULL COMMENT '手机号码',
  `purchaseusex` tinyint(1) NOT NULL DEFAULT '2' COMMENT '0 未知 1 男 2 女性',
  `purchaseage` varchar(16) COMMENT '预学生年龄',
  `purchasedetails` varchar(1024) COMMENT '预学生介绍',
  `classcardid` INT UNSIGNED NOT NULL COMMENT '课卡ID',
  `purchaseaddress` varchar(200) COMMENT '上课地址',
  `purchasedatatime` varchar(200) COMMENT '上课时间',
  `schoolid` INT UNSIGNED COMMENT '教学点ID',
  `purchaseopenid` varchar(64) NOT NULL COMMENT '用户ID',
  `paydetails` varchar(1024) COMMENT '支付方式',
  `paytime` varchar(1024) COMMENT '支付时间',
  `purchaseactive` tinyint(1) NOT NULL DEFAULT '0' COMMENT '已支付1,未支付0',
  FOREIGN KEY (`classcardid`) REFERENCES xrk_classcards(`classcardid`),
  FOREIGN KEY (`schoolid`) REFERENCES xrk_schools(`schoolid`),
  FOREIGN KEY (`purchaseopenid`) REFERENCES xrk_users(`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='预学生';
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `weapp`.`xrk_schools` (`schoolname`, `schooladdress`, `schoolleader`, `schoolmobile`, `schooldetails`, `schoolactive`) VALUES ('广州萝岗万达店', '广州萝岗万达广场室外步行街南区B250', '江星', '13570187950', '向日葵艺术旗舰店', '1');

INSERT INTO `weapp`.`xrk_courses` (`coursename`, `coursedetails`, `courseactive`) VALUES ('少儿拉丁舞', '', '1');
INSERT INTO `weapp`.`xrk_courses` (`coursename`, `coursedetails`, `courseactive`) VALUES ('少儿中国舞', '', '1');
INSERT INTO `weapp`.`xrk_courses` (`coursename`, `coursedetails`, `courseactive`) VALUES ('少儿艺术体操', '', '1');
INSERT INTO `weapp`.`xrk_courses` (`coursename`, `coursedetails`, `courseactive`) VALUES ('少儿跆拳道', '', '1');
INSERT INTO `weapp`.`xrk_courses` (`coursename`, `coursedetails`, `courseactive`) VALUES ('少儿爵士舞', '', '1');
INSERT INTO `weapp`.`xrk_courses` (`coursename`, `coursedetails`, `courseactive`) VALUES ('成人拉丁舞', '', '1');
INSERT INTO `weapp`.`xrk_courses` (`coursename`, `coursedetails`, `courseactive`) VALUES ('成人摩登舞', '', '1');
INSERT INTO `weapp`.`xrk_courses` (`coursename`, `coursedetails`, `courseactive`) VALUES ('成人肚皮舞', '', '1');
INSERT INTO `weapp`.`xrk_courses` (`coursename`, `coursedetails`, `courseactive`) VALUES ('成人形体芭蕾', '', '1');

INSERT INTO `weapp`.`xrk_classcards` (`classcardname`, `classcardprice`, `classcardtimes`, `classcardtime`, `classcarddetails`, `courseid`, `classcardactive`) VALUES ('兴趣班', '198', '8', '90', '2018年6月5日-2018年6月8日', '1', '0');
INSERT INTO `weapp`.`xrk_classcards` (`classcardname`, `classcardprice`, `classcardtimes`, `classcardtime`, `classcarddetails`, `courseid`, `classcardactive`) VALUES ('年卡', '5040', '90', '90', '2018年4月1日至2018年6月30日', '1', '1');
INSERT INTO `weapp`.`xrk_classcards` (`classcardname`, `classcardprice`, `classcardtimes`, `classcardtime`, `classcarddetails`, `courseid`, `classcardactive`) VALUES ('半年卡', '3060', '45', '90', '2018年4月1日至2018年6月30日', '1', '1');
INSERT INTO `weapp`.`xrk_classcards` (`classcardname`, `classcardprice`, `classcardtimes`, `classcardtime`, `classcarddetails`, `courseid`, `classcardactive`) VALUES ('学期卡', '2280', '30', '90', '2018年4月1日至2018年6月30日', '1', '1');
INSERT INTO `weapp`.`xrk_classcards` (`classcardname`, `classcardprice`, `classcardtimes`, `classcardtime`, `classcarddetails`, `courseid`, `classcardactive`) VALUES ('基础卡', '800', '10', '90', '2018年4月1日至2018年6月30日', '1', '1');

INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `classdetails`, `classactive`) VALUES ('初始班级', '', '', '0', '1000', '1', '','1');

INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('拉丁舞常规班大班', '2018.7.17-2018.8.4,逢周二、三、四、五、六上课', '19:30-21:00', '0', '18', '1', '1', '7岁以上','1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('拉丁舞常规班小班', '2018.7.17-2018.8.4,逢周二、三、四、五、六上课', '16:00-17:30', '0', '18', '1', '1', '5-6岁','1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('拉丁舞兴趣1班', '2018.7.18-2018.7.29,逢周三、四、六、日上课', '10:45-12:15', '0', '18', '1', '1', '4-6.5岁','1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('拉丁舞兴趣2班', '2018.7.18-2018.7.29,逢周三、四、六、日上课', '14:00-15:30', '0', '18', '1', '1', '6.5岁以上','1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('中国舞常规班2级班', '2018.7.17-2018.8.4,逢周二、三、四、五、六上课', '19:30-21:00', '0', '18', '1', '2', '5岁以上', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('中国舞常规班启蒙班', '2018.7.17-2018.8.4,逢周二、三、四、五、六上课', '16:00-17:30', '0', '18', '1', '2', '3.5-5岁','1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('中国舞兴趣1班', '2018.7.17-2018.7.29,逢周二、四、六、日上课', '14:00-15:30', '0', '18', '1', '2', '3.5-6岁','1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('中国舞兴趣2班', '2018.7.17-2018.7.29,逢周二、四、六、日上课', '15:45-17:15', '0', '18', '1', '2', '3.5-6岁','1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('中国舞兴趣3班', '2018.7.17-2018.7.29,逢周二、四、六、日上课', '17:45-19:15', '0', '18', '1', '2', '7岁以上','1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('跆拳道常规班', '2018.7.17-2018.8.5,逢周二、三、五、六、日上课', '周二、六、日15:45-17:15,周三、五17:45-19:15', '0', '18', '1', '4', '4岁以上', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('跆拳道兴趣1班', '2018.6.30-2018.7.15,逢周三、五、日上课', '周三、周五18:00-19:30,周日14:00-15:30', '0', '18', '1', '4', '4-7岁', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('跆拳道兴趣2班', '2018.6.30-2018.7.15,逢周三、六、日上课', '周三19:30-21:00,周六、周日10:45-12:15', '0', '18', '1', '4', '4-7岁', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('跆拳道兴趣3班', '2018.7.17-2018.7.28,逢周二、三、六、日上课', '10:45-12:15', '0', '18', '1', '4', '8岁以上', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('跆拳道兴趣4班', '2018.7.17-2018.7.28,逢周二、三、六、日上课', '14:00-15:30', '0', '18', '1', '4', '8岁以上', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('爵士舞兴趣1班', '2018.7.17-2018.7.27,逢周二、三、四、五上课', '9:00-10:30', '0', '18', '1', '5', '7岁以上', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('爵士舞兴趣2班', '2018.7.17-2018.7.27,逢周二、三、四、五上课', '10:45-12:15', '0', '18', '1', '5', '7岁以下','1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('艺术体操班', '2018.6.29-2018.7.15,逢周三、五、六上课', '周三19:30-21:00,周五、六18:00-19:30', '0', '18', '1', '3', '5岁以上', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('拉丁舞常规班', '原上课时间', '', '0', '18', '1', '6', '18岁以上', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('成人拉丁舞兴趣班1班', '2018.6.23-2018.7.15,逢周六、日上课', '18:00-19:30', '0', '18', '1', '6', '18岁以上', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('成人拉丁舞兴趣班2班', '2018.6.23-2018.7.15,逢周六、日上课', '19:30-21:00', '0', '18', '1', '6', '18岁以上', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('摩登舞常规班', '每周五原上课时间不变', '19:30-21:00', '0', '18', '1', '7', '18岁以上', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('摩登舞兴趣班', '2018.6.23-2018.7.15,逢周六、日上课', '19:30-21:00', '0', '18', '1', '7', '18岁以上', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('肚皮舞兴趣班', '2018.6.23-2018.7.15,逢周六、日上课', '15:45-17:15', '0', '18', '1', '8', '18岁以上', '1');
INSERT INTO `weapp`.`xrk_classes` (`classname`, `classdate`, `classtime`, `classnumusers`, `classmaxnumusers`, `schoolid`, `courseid`, `classdetails`, `classactive`) VALUES ('形体芭蕾兴趣班', '2018.6.19-2018.7.15,逢周二、周日上课', '周二19:00-20:30,周日10:30-12:00', '0', '18', '1', '9', '18岁以上', '1');

